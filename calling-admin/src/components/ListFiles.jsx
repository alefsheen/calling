import React, { useState, useEffect } from "react";
import { S3 } from "aws-sdk";

const ListFiles = ({ accessKeyId, secretAccessKey, endpoint, bucket }) => {
  const [allFiles, setAllFiles] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllFiles = async () => {
    const s3 = new S3({
      accessKeyId,
      secretAccessKey,
      endpoint,
    });

    try {
      const response = await s3.listObjectsV2({ Bucket: bucket }).promise();
      setAllFiles(response.Contents);
    } catch (error) {
      setError("Error fetching files: " + error.message);
    }
  };

  useEffect(() => {
    fetchAllFiles();
  }, []);

  return (
    <div>
      <h2>All Files:</h2>
      {error && <p>{error}</p>}
      {allFiles.length > 0 && (
        <ul>
          {allFiles.map((file) => {
            const s3 = new S3({
              accessKeyId,
              secretAccessKey,
              endpoint,
            });

            return (
              <li key={file.Key}>
                {file.Key}{" "}
                <a
                  href={s3.getSignedUrl("getObject", {
                    Bucket: bucket,
                    Key: file.Key,
                    Expires: 3600,
                  })}
                  download
                >
                  Download
                </a>{" "}
                <button onClick={() => handleDeleteFile(file)}>Delete</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ListFiles;
