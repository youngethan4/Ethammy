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
  uuid : '',
  email : '',
  username : '',
  discriminator : '',
  dob : '',
  status : ''
};

module.exports = {
  response : responseTemplate,
  user : userTemplate
}
