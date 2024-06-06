declare const insertLineBreaks: (inputText: string) => string;
declare const recursiveProperties: (props: string[], value: string, obj?: NestedObject) => NestedObject | undefined;
declare const transformIntakeIntoAssetProps: (collection?: IntakeAssetProps[]) => AssetProps[] | undefined;
export { insertLineBreaks, recursiveProperties, transformIntakeIntoAssetProps };
