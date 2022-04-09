
export interface UserLogin {
    /**
     * @minLength 1
     * @maxLength 100
     */
    username: string,

    /**
     * @minLength 1
     * @maxLength 100
     */
    password: string,
}
