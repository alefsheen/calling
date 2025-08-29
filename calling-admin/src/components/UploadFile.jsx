import React, { useState } from "react";
import { S3 } from "aws-sdk";

const UploadFile = ({
  accessKeyId,
  secretAccessKey,
  endpoint,
  bucket,
  onUpload,
}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploadLink, setUploadLink] = useState(null);
  const [permanentLink, setPermanentLink] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
    setUploadLink(null);
    setPermanentLink(null);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        setError("Please select a file");
        return;
      }

      const s3 = new S3({
        accessKeyId,
        secretAccessKey,
        endpoint,
      });

      const params = {
        Bucket: bucket,
        Key: file.name,
        Body: file,
      };

      const response = await s3.upload(params).promise();
      const signedUrl = s3.getSignedUrl("getObject", {
        Bucket: bucket,
        Key: file.name,
        Expires: 3600,
      });

      setUploadLink(signedUrl);

      // Get permanent link
      const permanentSignedUrl = s3.getSignedUrl("getObject", {
        Bucket: bucket,
        Key: file.name,
        Expires: 31536000, // 1 year
      });
      setPermanentLink(permanentSignedUrl);

      onUpload(response);

      console.log("File uploaded successfully");
    } catch (error) {
      setError("Error uploading file: " + error.message);
    }
  };

  return (
    <div>
      <h1>Upload File to S3</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      {uploadLink && (
        <h3>
          File uploaded successfully. Temporary Link:{" "}
          <a href={uploadLink} target="_blank" rel="noopener noreferrer">
            Temporary Link
          </a>
        </h3>
      )}
      {permanentLink && (
        <h3>
          Permanent Link:{" "}
          <a href={permanentLink} target="_blank" rel="noopener noreferrer">
            Permanent Link
          </a>
        </h3>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UploadFile;
