export const buildFolderTree = (folders, parentId = null) => {
   
    return folders
        .filter(folder => folder.parentFolderId === parentId)
        .map(folder => ({
            ...folder,
            subfolders: buildFolderTree(folders, folder.id)
        }));
};