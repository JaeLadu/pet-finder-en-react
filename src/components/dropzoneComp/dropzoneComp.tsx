import React, { useEffect, useState } from "react";
import css from "./dropzoneComp.css";
import Dropzone from "react-dropzone";
import { dropzone, img, thumbnail, thumbnailContainer } from "./dropzoneStyles";

type props = {
   handleFile?: (file: any) => any;
};
export function DropzoneComp({ handleFile = () => {} }: props) {
   const [file, setFile] = useState({ preview: "", dataURL: "", name: "" });
   useEffect(() => {
      // Necesario para que las thumbnails no generen errores en dropzone
      return URL.revokeObjectURL(file.preview);
   }, []);

   return (
      <div className={css.dropzone}>
         <Dropzone
            onDrop={async (acceptedFiles) => {
               // gets image base64 string and other neccesary transformations for de component to work
               const file = await parseFile(acceptedFiles[0]);
               setFile(file);
               //    function passed from the outside
               handleFile(file);
            }}
         >
            {({ getRootProps, getInputProps }) => (
               <div
                  {...getRootProps({
                     className: "dropzone",
                     style: dropzone,
                  })}
               >
                  <input {...getInputProps()} />
                  {file.dataURL ? (
                     <div style={thumbnailContainer} key={file.name}>
                        <div style={thumbnail}>
                           <img
                              src={file.preview}
                              style={img}
                              // Necesario para que las thumbnails no generen errores en dropzone
                              onLoad={() => {
                                 URL.revokeObjectURL(file.preview);
                              }}
                           />
                        </div>
                     </div>
                  ) : (
                     <span>Agregar foto</span>
                  )}
               </div>
            )}
         </Dropzone>
      </div>
   );
}

function getBase64(file: File | Blob): Promise<string> {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
         try {
            resolve(reader.result?.toString()!);
         } catch (error) {
            console.log("error en load de fileReader", error);
         }
      };
      reader.onerror = (error) => console.log("error de fileReader", error);
   });
}

async function parseFile(file: File) {
   const dataURL = await getBase64(file);
   const preview = URL.createObjectURL(file);
   const parsedFile = {
      ...file,
      dataURL: dataURL,
      preview: preview,
   };
   return parsedFile;
}
