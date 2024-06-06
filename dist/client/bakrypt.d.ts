interface useBakClientProps {
    getTransaction: (uuid: string) => Promise<TransactionProps>;
    mintTransaction: (uuid: string) => Promise<TransactionProps>;
    refundTransaction: (uuid: string) => Promise<TransactionProps>;
    submitRequest: (data: OutputAssetProps[]) => Promise<OutputAssetProps[]>;
    getCollectionByTxUuid: (uuid: string) => Promise<{
        results: AssetProps[];
    }>;
    uploadIPFSFile: (data: File) => Promise<AttachmentProps>;
}
declare const useBakClient: () => useBakClientProps;
export default useBakClient;
