import bcrypt from 'bcrypt'

// 密码服务类
export class PasswordService {
  // 盐值复杂度
  private static readonly SALT_ROUNDS = 15

  /**
   * 哈希密码
   * @param plainPassword 明文密码
   * @returns 哈希后的密码
   */
  static async hashPassword(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS)

    return bcrypt.hash(plainPassword, salt)
  }

  /**
   * 验证密码
   * @param plainPassword 明文密码
   * @param hashedPassword 哈希后的密码
   * @returns 是否匹配
   */
  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }
}
