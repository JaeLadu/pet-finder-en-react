import { TextInput } from "components/textInput/textInput";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Title } from "ui/title/title";
import css from "./report.css";
import { dropzone, img, thumbnail, thumbnailContainer } from "./dropzoneStyles";

export function CreateReport() {
   const [files, setFiles] = useState([{}]);
   useEffect(() => {
      // Necesario para que las thumbnails no generen errores en dropzone
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
   }, []);

   return (
      <div className={css.root}>
         <Title text="Reportar mascota" />
         <form className={css.form}>
            <TextInput text="Nombre" name="name" />

            <div className={css.dropzone}>
               <Dropzone
                  onDrop={async (acceptedFiles) => {
                     const files = await Promise.all(
                        acceptedFiles.map(async (file) => {
                           let dataURL = await getBase64(file);
                           return {
                              ...file,
                              preview: URL.createObjectURL(file),
                              dataURL: dataURL,
                           };
                        })
                     );

                     setFiles(files);
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
                        <span>Agregar foto</span>
                     </div>
                  )}
               </Dropzone>
               {files.map((file) => (
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
               ))}
            </div>
         </form>
      </div>
   );
}

function getBase64(file: File | Blob) {
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
