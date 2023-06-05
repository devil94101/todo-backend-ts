
export const successResponse = (res, status, data: any) => {
    return res.status(status).send({
        status: "success",
        error: false,
        data
    })
}

// export const faliureResponse = (res, err: ErrorParam) => {
//     let status = err?.status || 500
//     return res.status(status).send({
//         status: "error",
//         error: true,
//         message: err.message
//     })
// }
