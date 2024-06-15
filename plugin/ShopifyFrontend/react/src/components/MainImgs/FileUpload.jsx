import React, { useCallback, useEffect, useState } from 'react';
import { DropZone, LegacyStack, Thumbnail, Text, Button } from '@shopify/polaris';

const FileUpload = ({ label, onFileChange, initialFile, onDelete }) => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);

    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) => {
            const selectedFile = acceptedFiles[0];
            setFile(selectedFile);
            onFileChange(selectedFile);
            onDelete(false);  // ファイルがアップロードされた場合は削除フラグをリセット
        },
        [onFileChange,onDelete]
    );

    const handleClearFile = () => {
        setFile(null);
        setFileUrl(null);
        onFileChange(null);
        onDelete(true);  // ファイルが削除された場合に削除フラグを設定
    }

    useEffect(() => {
        if (initialFile) {
            setFileUrl(initialFile);
        }
    }, [initialFile]);

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const fileUpload = !file && !fileUrl && <DropZone.FileUpload actionTitle="ファイルアップロード" actionHint="許可するファイルタイプ .gif, .jpg, .png" />;
    const uploadedFile = (file || fileUrl) && (
        <LegacyStack alignment="center">
            <Thumbnail
                size="small"
                alt={file ? file.name : 'Uploaded image'}
                source={validImageTypes.includes(file?.type) ? window.URL.createObjectURL(file) : fileUrl}
            />
            <div>
                {file ? file.name : 'Uploaded image'}
                {file && <Text variant="bodySm" as="p">{file.size} bytes</Text>}
            </div>
        </LegacyStack>
    );

    return (
        <>
            <DropZone allowMultiple={false} onDrop={handleDropZoneDrop} label={label} accept=".gif, .png, .jpg, .jpeg" variableHeight>
                {uploadedFile}
                {fileUpload}
            </DropZone>
            {(file || fileUrl) && (
                <div className='mt10'>
                    <Button onClick={handleClearFile} plain destructive>
                        画像削除する
                    </Button>
                </div>
            )}
        </>
    );
};

export default FileUpload;
