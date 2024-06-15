import React, { useEffect, useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { Page, Card, Button, FormLayout, TextField, InlineError, Select, Text } from '@shopify/polaris';
import { useParams, useNavigate } from 'react-router-dom';
import { LINK_FLAG_OPTIONS } from '../../config/MainImgsConfig';
import useForm from '../../hooks/useForm';
import FileUpload from '../../components/MainImgs/FileUpload';

const MainImgsShowPage = () => {
    const { id } = useParams();

    const [formState, handleChange, setFormState] = useForm({
        alt: '',
        url: '',
        link_flag: '',
        sort_no:'',
        created_at: '',
        updated_at:'',
        pc_img_delete: false,  // PC画像削除フラグ
        sp_img_delete: false,   // SP画像削除フラグ
    });

    const [fieldErrors, setFieldErrors] = useState({});
    const [pcFile, setPcFile] = useState(null);
    const [spFile, setSpFile] = useState(null);
    const { data, error, updateFormData, fetchShow } = useFetchData('/api/main_imgs');

    const handlePcFileDelete = (deleteFlag) => {
        setFormState((prevState) => ({ ...prevState, pc_img_delete: deleteFlag }));
    };

    const handleSpFileDelete = (deleteFlag) => {
        setFormState((prevState) => ({ ...prevState, sp_img_delete: deleteFlag }));
    };


    const navigate = useNavigate();

    const handleSubmit = async () => {
        setFieldErrors({});
        console.log("hoge");
        console.log(formState);
        await updateFormData(id, {
            ...formState,
            pc_img: pcFile,
            sp_img: spFile
        });
    };

    useEffect(() => {
        fetchShow(id);
    }, []);


    // データ取得後にフォームの状態を更新
    useEffect(() => {
        if (data?.data) {
            setFormState({
                ...data.data,
                pc_img_delete: formState.pc_img_delete,
                sp_img_delete: formState.sp_img_delete,
                pc_img: pcFile,
                sp_img: spFile,
            }); 
            setPcFile(data.data.pc_img ? data.data.pc_img : null);
            setSpFile(data.data.sp_img ? data.data.sp_img : null);
        }
    }, [data, error]);


    // 非同期処理後にerrorの更新を待機するためにuseEffectを使用
    useEffect(() => {
        console.log(error);
        console.log(data);
        if (!error && data?.id) {
            navigate('/', { state: { message: '更新に成功しました', description: data?.message } });
        } else if (error?.messages) {
            if (error?.status == 404) {
                navigate('/', { state: { message: '見つかりませんでした', description: error.messages.error, tone: "critical" } });
            }
            setFieldErrors(error.messages);
        }
    }, [data, error]);



    return (
        <Page
            backAction={{ content: 'Settings', onAction: () => navigate('/') }}
            title="メインビジュアル編集"
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

                    <FileUpload label="PC画像" onFileChange={setPcFile} initialFile={pcFile} onDelete={handlePcFileDelete} />
                    {fieldErrors?.pc_img && (
                        <InlineError message={fieldErrors.pc_img} />
                    )}

                    <FileUpload label="SP画像" onFileChange={setSpFile} initialFile={spFile} onDelete={handleSpFileDelete} />
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

                    <Text as="p">
                        作成日：{formState.created_at}<br />
                        更新日：{formState.updated_at}
                    </Text>

                    <Button onClick={handleSubmit}>更新</Button>
                </FormLayout>
            </Card>
        </Page>
    );
};

export default MainImgsShowPage;