import React, { useEffect, useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { Page, Card, Button, InlineError, Text, FormLayout, TextField, RadioButton, InlineStack } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';

import useForm from '../../hooks/useForm';
const SettingsIndexPage = () => {
  const { data, error, addData, fetchShow } = useFetchData('/api/main_img_setting');
  const { data: assets, fetchList: fetchAssets } = useFetchData('/api/assets');

  const [formState, handleChange, setFormState] = useForm({
    stop: '',
    speed: '',
    method: null,
    arrow: null,
    dots: null
  });
  
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchShow(null,"");
    fetchAssets({}, "/main_img");
  }, []);


  const handleCopy = () => {
    navigator.clipboard.writeText(assets?.data)
      .then(() => { })
      .catch(() => {
        alert("コピーに失敗しました");
      });
  };



  const handleSubmit = async () => {
    setFieldErrors({});
    await addData({
      ...formState
    }, "save")
  }

  useEffect(() => {
    if (!error && data?.id) {
      navigate('/', { state: { message: '更新に成功しました。', description: data?.message } });
    } else if (error?.messages) {
      console.log(error.messages);
      setFieldErrors(error.messages);
    }else if (data?.data) {
      console.log("test");
      setFormState({
        ...data.data,
      });
    }
  }, [data, error]);

  return (
    <Page
      title="設定ページ"
    >
      <div className='mb20'>
        <Card>
          <FormLayout>
            {fieldErrors?.error && (
              <InlineError message={fieldErrors.error} />
            )}

            <TextField label="停止時間(ミリ秒)" value={formState.stop} onChange={handleChange('stop')} />
            {fieldErrors?.stop && (
              <InlineError message={fieldErrors.stop} />
            )}

            <TextField label="スライドの速さ(ミリ秒)" value={formState.speed} onChange={handleChange('speed')} />
            {fieldErrors?.speed && (
              <InlineError message={fieldErrors.speed} />
            )}


            <div>
              <Text as="p">スライド方法</Text>
              <InlineStack wrap={false}>
                <RadioButton
                  label="フェード"
                  name="method"
                  checked={formState.method == 1}
                  onChange={() => setFormState(prevState => ({ ...prevState, method: 1 }))}
                />
                <span className='mr15'></span>
                <RadioButton
                  label="横スライド"
                  name="method"
                  checked={formState.method == 0}
                  onChange={() => setFormState(prevState => ({ ...prevState, method: 0 }))}
                />
              </InlineStack>

              {fieldErrors?.method && (
                <InlineError message={fieldErrors.method} />
              )}
            </div>


            <div>
              <Text as="p">矢印表示</Text>
              <InlineStack wrap={false}>
                <RadioButton
                  label="あり"
                  name="arrow"
                  checked={formState.arrow == 1}
                  onChange={() => setFormState(prevState => ({ ...prevState, arrow: 1 }))}
                />
                <span className='mr15'></span>
                <RadioButton
                  label="なし"
                  name="arrow"
                  checked={formState.arrow == 0}
                  onChange={() => setFormState(prevState => ({ ...prevState, arrow: 0 }))}
                />
              </InlineStack>

              {fieldErrors?.arrow && (
                <InlineError message={fieldErrors.arrow} />
              )}
            </div>


            <div>
              <Text as="p">ドット表示</Text>
              <InlineStack wrap={false}>
                <RadioButton
                  label="あり"
                  name="dots"
                  checked={formState.dots == 1}
                  onChange={() => setFormState(prevState => ({ ...prevState, dots: 1 }))}
                />
                <span className='mr15'></span>
                <RadioButton
                  label="なし"
                  name="dots"
                  checked={formState.dots == 0}
                  onChange={() => setFormState(prevState => ({ ...prevState, dots: 0 }))}
                />
              </InlineStack>

              {fieldErrors?.dots && (
                <InlineError message={fieldErrors.dots} />
              )}
            </div>

            <Button onClick={handleSubmit}>更新</Button>
          </FormLayout>
        </Card>
      </div>


      {assets?.data && (
        <div className="mb20">
          <Card title="Fetched Data" sectioned>
            <div className='mb10'>
              <Text as="h3" fontWeight="bold">貼り付けhtml<br />(トップに貼り付けてください)</Text>
              <InlineError message={"※Asset APIから更新、新規追加の規制が厳しくなっため、htmlをそのままLiquidファイルに貼り付けて、カスタマイズしてください"} />
            </div>
            <div className='mb30'>
              <Button onClick={handleCopy}>コピーする</Button>
            </div>
            <pre>
              {assets.data}
            </pre>
          </Card>
        </div>
      )}
    </Page>
  );
};

export default SettingsIndexPage;
