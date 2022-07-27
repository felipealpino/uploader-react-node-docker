export const FILE_TYPES_CONSTRAINTS = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
export const FILE_TYPES_EXTENSIONS = FILE_TYPES_CONSTRAINTS.map(type => '.' + type.split('/')[1]);
