import React, { useEffect, useState, useCallback } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { Page, Card, Button, FormLayout, TextField, InlineError, Select } from '@shopify/polaris';
import FileUpload from '../../components/MainImgs/FileUpload';

import { useNavigate } from 'react-router-dom';
import { LINK_FLAG_OPTIONS } from '../../config/MainImgsConfig';
import useForm from '../../hooks/useForm';

const MainImgsCreatePage = () => {

    const [formState, handleChange, setFormState] = useForm({
        alt: '',
        url: '',
        link_flag: '',
        sort_no:''
    });

    const [fieldErrors, setFieldErrors] = useState({});
    const { data, error, addFormData } = useFetchData('/api/main_imgs');

    const [pcFile, setPcFile] = useState(null);
    const [spFile, setSpFile] = useState(null);

    const handlePcFileDelete = (deleteFlag) => {
        setFormState((prevState) => ({ ...prevState, pc_img_delete: deleteFlag }));
    };

    const handleSpFileDelete = (deleteFlag) => {
        setFormState((prevState) => ({ ...prevState, sp_img_delete: deleteFlag }));
    };


    const navigate = useNavigate();

    const handleSubmit = async () => {
        setFieldErrors({});
        console.log(pcFile);
        await addFormData({
            alt: formState.alt,
            url: formState.url,
            pc_img: pcFile,
            sp_img: spFile,
            link_flag: formState.link_flag,
            sort_no: formState.sort_no
        });
    };


    // 非同期処理後にerrorの更新を待機するためにuseEffectを使用
    useEffect(() => {
        if (!error && data?.id) {
            navigate('/', { state: { message: '新規追加に成功しました', description: data?.message } });
        } else if (error?.messages) {
            console.log(error.messages);
            setFieldErrors(error.messages);
        }

    }, [data, error]);



    return (
        <Page
            backAction={{ content: 'Settings', onAction: () => navigate('/') }}
            title="メインビジュアル新規作成"
        >
            <Card>
                <FormLayout>
                    {fieldErrors?.error && (
                        <InlineError message={fieldErrors.error} />
                    )}

                    <TextField label="画像名(alt)" value={formState.alt} onChange={handleChange('alt')} />
                    {fieldErrors?.alt && (
                        <InlineError message={fieldErrors.alt} />
                    )}

                    <TextField label="リンク先URL" value={formState.url} onChange={handleChange('url')} />
                    {fieldErrors?.url && (
                        <InlineError message={fieldErrors.url} />
                    )}


                    <FileUpload label="PC画像" onFileChange={setPcFile} onDelete={handlePcFileDelete} />
                    {fieldErrors?.pc_img && (
                        <InlineError message={fieldErrors.pc_img} />
                    )}
                    
                    <FileUpload label="SP画像" onFileChange={setSpFile} onDelete={handleSpFileDelete} />
                    {fieldErrors?.sp_img && (
                        <InlineError message={fieldErrors.sp_img} />
                    )}

                    <Select
                        label="リンク先表示"
                        options={LINK_FLAG_OPTIONS}
                        onChange={handleChange('link_flag')}
                        value={formState.link_flag}
                    />

                    {fieldErrors?.link_flag && (
                        <InlineError message={fieldErrors.link_flag} />
                    )}

                    <TextField label="並び順" value={formState.sort_no} onChange={handleChange('sort_no')} />
                    {fieldErrors?.sort_no && (
                        <InlineError message={fieldErrors.sort_no} />
                    )}

                    <Button onClick={handleSubmit}>登録</Button>
                </FormLayout>
            </Card>
        </Page>
    );
};

export default MainImgsCreatePage;