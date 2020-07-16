const responseTemplate = {
  endpoint : '',
  timestamp : 0,
  status : 200,
  error : {
    type : 'NA',
    message : 'request successful'
  },
  data : undefined
};

const userTemplate = {
  id : '',
  username : '',
  discriminator : ''
};

module.exports = {
  response : new responseTemplate,
  user : new userTemplate
}
