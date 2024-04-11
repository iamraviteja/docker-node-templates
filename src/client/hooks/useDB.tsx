import * as React from "react";
import initSqlJs from "sql.js";

export const EXEC_QUERY = "exec_query";
export const INIT_DB_SUCCESS = "init_db_success";
export const INIT_DB_ERROR = "init_db_error";

type Action = {
  type: "exec_query" | "init_db_success" | "init_db_error";
  payload: any;
};
type Dispatch = (action: Action) => void;
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
      return state;
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
            // Execute a single SQL string that contains multiple statements
            let sqlstr = "CREATE TABLE hello (a int, b char); \
            INSERT INTO hello VALUES (0, 'hello'); \
            INSERT INTO hello VALUES (1, 'world');";
            db.run(sqlstr); // Run the query without returning anything

            // Prepare an sql statement
            const stmt = db.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval");

            // Bind values to the parameters and fetch the results of the query
            const result = stmt.getAsObject({':aval' : 1, ':bval' : 'world'});
            console.log(result); // Will print {a:1, b:'world'}
            stmt.free();
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
