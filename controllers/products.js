const Product = require('../models/product');


const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({})
    .sort('name')
    .select('name');
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query;
    let queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true'? true : false;
    }
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = { $regex : name, $options : 'i'};
    }
    if(numericFilters){
        const operatorMap = {
            '<' : '$lt',
            '<=' : '$lte',
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
        }
        const regEx = /\b(<|<=|>|>=|=)\b/g;
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if(options.includes(field)){
                queryObject[field] = { [operator] : Number(value) }
            }
        });
    }

    let result = Product.find(queryObject);
    if(sort){
       const sortList = sort.split(',').join(' ');
       result = result.sort(sortList); 
    }
    else{
        result = result.sort('createdAt');
    }
    if(fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const skip = (page - 1) * limit;

    result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({products, nbHits: products.length})
}


module.exports = {
    getAllProducts,
    getAllProductsStatic
}