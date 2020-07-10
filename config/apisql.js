const sqlMap = {
    user: {
        userSearch: `select * from user_insert where username=?`,
        userInsert: `INSERT INTO user_insert (username,password,email,phone) VALUES(?,?,?,?)`
    }
}
module.exports = sqlMap