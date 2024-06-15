export const LINK_FLAG_OPTIONS = [
    { label: '選択してください', value: '' },
    { label: '同じ画面のまま移動', value: "0" },
    { label: '別ウィンドウ', value: "1" },
];

export const LINK_FLAG_LABELS = {
    pending: '同じ画面のまま移動',
    publish: '別ウィンドウ',
};

export const getLinksLabel = (links) => {
    return LINK_FLAG_LABELS[links] || '不明なステータス';
};

