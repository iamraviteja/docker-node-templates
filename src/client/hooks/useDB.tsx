import * as React from "react";
import initSqlJs from "sql.js";

export const EXEC_QUERY = "exec_query";
export const INIT_DB_SUCCESS = "init_db_success";
export const INIT_DB_ERROR = "init_db_error";

type Action = {
  type: "exec_query" | "init_db_success" | "init_db_error";
  payload: any;
};
type State = { db: any; dbError: any; res: any };
type SQLiteDBProviderProps = { children: React.ReactNode };

const SQLiteDBContext = React.createContext<
  { state: State; execQuery: (query:string)=> void } | undefined
>(undefined);

function dbReducer(state: State, action: Action) {
  switch (action.type) {
    case INIT_DB_SUCCESS:
      return { db: action.payload, dbError: null, res: null };
    case INIT_DB_ERROR:
      return { db: null, dbError: action.payload, res: null };
    case EXEC_QUERY:
      let res = null;
      if(state.db){
        res = state.db.exec(action.payload);
      }
      return {...state, res};
    default:
      throw new Error(`Unhandled action type ${action.type} in theme reducer!`);
  }
}

export const SQLiteDBProvider = ({ children }: SQLiteDBProviderProps) => {
  const [state, dispatch] = React.useReducer(dbReducer, {
    db: null,
    dbError: null,
    res: null,
  });

  React.useEffect(() => {
    (async () => {
        try {
            const SQL = await initSqlJs({
              locateFile: (file) => `https://sql.js.org/dist/${file}`,
            });
            const db = new SQL.Database();
            
            dispatch({ type: INIT_DB_SUCCESS, payload: db });
          } catch (err) {
            dispatch({ type: INIT_DB_ERROR, payload: err });
          }
    })();
  }, []);

  const value = { state, execQuery: (query: string) => dispatch({type: EXEC_QUERY, payload: query}) };
  return (
    <SQLiteDBContext.Provider value={value}>
      {children}
    </SQLiteDBContext.Provider>
  );
};

export const useDB = () => {
  const context = React.useContext(SQLiteDBContext);
  if (context === undefined) {
    throw new Error(
      `The current component is not under SQLiteDBProvider please check!`
    );
  }
  return context;
};
