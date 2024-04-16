import { usePapaParse } from "react-papaparse";
import { useEffect, useState } from "react";

function useCSV() {
  const [file, setFile] = useState<File>();
  const [results, setResults] = useState();

  const { readString } = usePapaParse();
  useEffect(() => {
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        // Use reader.result
        readString(reader.result as string, {
          worker: true,
          complete: (res) => {
            setResults(res);
          },
          header: true,
        });
      };
      reader.readAsText(file);
    }
  }, [file]);

  return { setFile, results };
}

export default useCSV;
