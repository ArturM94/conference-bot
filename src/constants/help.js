const HELP_MSG = {
  user: `
<b>💻 Available Bot Commands 📱</b>
<b>/speakers<i> - get all speakers</i></b>
<b>/lunch<i> - shows when it will be lunch</i></b>
<b>/now<i> - shows active speakers at the moment</i></b>
<b>/next<i> - shows the next speakers</i></b>
<b>/agenda<i> - shows all schedule</i></b>
<b>/afterparty<i> - shows location information</i></b>
<b>/savememories<i> - allows you to save photos</i></b>
<b>/getmemories<i> - shows all saved photos</i></b>
  `,
  admin: `
<b>🛡🛡 ADMIN Commands 🛡🛡</b>
<b>/post<i> - allows you to send a message to all users now</i></b>
<b>/delay_message<i> - allows you to schedule send a message</i></b>
<b>/scheduled_messages<i> - allows you to edit scheduled notifications</i></b>
  `,
};

module.exports = {
  HELP_MSG,
};
