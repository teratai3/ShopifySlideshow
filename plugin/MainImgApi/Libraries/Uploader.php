<?php

namespace Plugin\MainImgApi\Libraries;

class Uploader
{
    public function uploadFile($file, $folder, $allowedFormats = ['jpg', 'png', 'gif'])
    {
        //チェック自体はバリデーション側で対応する
        if ($file->isValid() && !$file->hasMoved()) {
            $fileExtension = $file->getExtension();

            if (in_array($fileExtension, $allowedFormats)) {
                $newFileName = $file->getRandomName();
                $uploadPath = ROOTPATH . 'public/assets/uploads/' . $folder;

                // ディレクトリが存在しない場合は作成する
                if (!file_exists($uploadPath)) {
                    if (!mkdir($uploadPath, 0777, true)) {
                        throw new \Exception('ディレクトリの作成に失敗しました: ' . $uploadPath);
                    }
                }

                if ($file->move($uploadPath, $newFileName)) {
                    return $folder."/".$newFileName;
                } else {
                    throw new \Exception('ファイルを移動できませんでした。');
                }
            } else {
                throw new \Exception('無効なファイル形式です。');
            }
        } else {
            throw new \Exception('無効なファイル、またはファイルがすでに移動されています。');
        }
    }
}
