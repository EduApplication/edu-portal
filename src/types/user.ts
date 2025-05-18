export interface UserDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roleName: string;
}

export interface CreateUserDto  {
    email: string;
    password: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    roleId: number;
}

interface RelatedUserInfoDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export interface UserDetailsDto extends UserDto {
    phoneNumber: string;
    createdAt?: string | Date;
    lastLogin?: string | Date;
    isActive: boolean;
    subjectNames?: string[];
    classNames?: string[];
    parents?: RelatedUserInfoDto[];
    children?: RelatedUserInfoDto[];
    tutorClassNames?: string[];
}

export interface UpdateUserDto {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}