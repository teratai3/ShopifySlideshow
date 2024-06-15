import React from 'react';
import { ResourceList, ResourceItem, Text, Thumbnail } from '@shopify/polaris';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ListComponent = ({ items, hasNext, hasPrevious, onNext, onPrevious }) => {
    const navigate = useNavigate();

    const handleItemClick = (item) => {
        if (window.confirm(`${item.title} を本当に削除しますか？`)) {
            navigate(`/main_imgs/delete/${item.id}`);
        }
    };

    return (
        <ResourceList
            resourceName={{ singular: 'item', plural: 'items' }}
            items={items}
            pagination={{
                hasNext: hasNext,
                onNext: onNext,
                hasPrevious: hasPrevious,
                onPrevious: onPrevious,
            }}
            renderItem={(item) => {
                const { id, alt, pc_img, url, created_at, updated_at } = item;
                const media = <Thumbnail source={pc_img} />;

                return (
                    <ResourceItem id={id} shortcutActions={[
                        {
                            content: <div onClick={() => handleItemClick(item)}>削除する</div>,
                        }
                    ]} persistActions media={media} >
                        <Link to={`/main_imgs/show/${id}`}>
                            <Text variation="strong" as="h3">alt：{alt || "未設定"}</Text>
                            <Text variation="strong" as="h3">リンク先url：{url || "未設定"}</Text>
                            <Text as="p">
                                作成日：{created_at}　更新日：{updated_at}
                            </Text>
                        </Link>
                    </ResourceItem>
                );
            }}
        />
    );
};

export default ListComponent;
