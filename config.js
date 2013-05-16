var config = {
  host: 'localhost',
  ddbbName: 'dogfooding',
  adminUser: '',
  adminPwd: '',
  mailSenderUser: '', //@tid.es
  mailSenderPassword: '',
  mailHost: 'correo.tid.es',
  mailSecureConnection: false, //if STARTTLS, keep false
  mailPort: ,
  mailSenderFrom: 'Equipo QA <owd_webfeedback@tid.es>',
  mailSenderSubject: 'FirefoxOS Trial – Thanks for your feedback!!',
  mailSenderText: 'Hello FirefoxOS Trial Driver!!\n\n' + 
                  'Many thanks for your feedback. We will read it carefully in order to improve the FirefoxOS experience.\n\n' + 
                  'Just a short reminder, if your feedback is related to freezes, crashes, reboots, and other fun & unexpected glitches please make use of the Support through the Digital Services Management Center (DSMC). You can reach them via phone (+34902090841) or via e-mail (dsmc.owd.support@tid.es)\n\n' + 
                  'Cheers,\n\n' +
                  '-- The OWD Trial Team!\n\n' +
                  'Please do not reply to this message via e-mail. This address is automated,\n'+
                  'unattended, and cannot help with questions or requests.'

};

module.exports = config;