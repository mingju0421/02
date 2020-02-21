
let DEBUG = process.env.NODE_ENV === 'production' ? true : false;
let USER_API = DEBUG ? '' : '';

const API = {
    charts: USER_API + '/oceanstream/pipeline/stat/ri.analysis.8d6bed68-5487-11ea-bd76-25ecaf722e6c?page=0'
}
export default API;