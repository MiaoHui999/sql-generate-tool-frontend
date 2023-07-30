/**
 * 用户类型定义
 */
declare namespace UserType {
  type UserGenderEnum = 'MALE' | 'FEMALE';

  /**
   * 实体
   */
  interface User {
    id?: number;
    userNickName?: string;
    // userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: UserGenderEnum;
    userRole?: string;
    userPassword?: string;
    createTime?: Date;
    updateTime?: Date;
  }

  /**
   * 用户类型
   */
  interface UserVO {
    id: number;
    userNickName?: string;
    // userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: UserGenderEnum;
    userRole?: string;
    createTime?: Date;
    updateTime?: Date;
  }

  /**
   * 用户注册请求
   */
  interface UserRegisterRequest {
    userNickName: string;
    userAccount: string;
    userPassword: string;
    checkPassword: string;
  }

  /**
   * 用户登录请求
   */
  interface UserLoginRequest {
    userAccount: string;
    userPassword: string;
  }

  /**
   * 用户创建请求
   */
  interface UserAddRequest {
    userNickName: string;
    userAccount: string;
    userAvatar?: string;
    gender?: UserGenderEnum;
    userRole: string;
    userPassword: string;
  }

  /**
   * 用户删除请求
   */
  interface UserDeleteRequest {
    id: number;
  }

  /**
   * 用户更新请求
   */
  interface UserUpdateRequest {
    id: number;
    userNickName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: UserGenderEnum;
    userRole?: string;
  }

  /**
   * 用户查询请求
   */
  interface UserQueryRequest extends PageRequest {
    id?: number;
    userNickName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: UserGenderEnum;
    userRole?: string;
    createTime?: Date;
    updateTime?: Date;
  }
}
