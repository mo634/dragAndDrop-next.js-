"use client"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"


const DropZone = ({ className }: { className: string }) => {

    const [files, setFiles] = useState<any[]>([]);
    const onDrop = useCallback((acceptedFiles: any) => {
        // If there are any accepted files
        if (acceptedFiles.length > 0) {
            // Update the state with the new files
            setFiles(prev => [
                // Keep the existing files
                ...prev,
                // Add the new files with a preview URL
                ...acceptedFiles.map((file: any) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            ])
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    console.log("files", files)
    return (
        <div {...getRootProps({ className })}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop files here</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default DropZone