import { CSSProperties } from "react";

export const dropzone: CSSProperties = {
   flex: 1,
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   justifyContent: "center",
   borderWidth: 2,
   borderRadius: 2,
   borderColor: "#eeeeee",
   borderStyle: "dashed",
   backgroundColor: "#fafafa",
   color: "#bdbdbd",
   outline: "none",
   transition: "border .24s ease-in-out",
   height: "100%",
   width: "100%",
};

export const thumbnailContainer: CSSProperties = {
   display: "inline-flex",
   borderRadius: 2,
   width: "100%",
   height: "100%",
   boxSizing: "border-box",
};
export const thumbnail: CSSProperties = {
   display: "flex",
   minWidth: 0,
   overflow: "hidden",
   justifyContent: "center",
};
export const img: CSSProperties = {
   display: "block",
   width: "auto",
   height: "100%",
};
