declare const insertLineBreaks: (inputText: string) => string;
declare const recursiveProperties: (props: string[], value: string, obj?: NestedObject) => NestedObject | undefined;
declare const transformIntakeIntoAssetProps: (collection?: IntakeAssetProps[]) => AssetProps[] | undefined;
declare function arrayBufferToBase64(buffer: ArrayBuffer): string;
declare function getContentType(input: string): Promise<string | null>;
export { insertLineBreaks, recursiveProperties, transformIntakeIntoAssetProps, getContentType, arrayBufferToBase64, };
