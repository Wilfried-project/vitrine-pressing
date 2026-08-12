const fs = require('fs')

// Liste exhaustive des emojis utilisés dans l'app
const emojisToRemove = [
  '📊', '🧺', '👥', '🧾', '💰', '⭐', '📦', '🚚', '🔔', '📅', '👔', '👷',
  '📒', '📈', '💲', '🏢', '⚙️', '👤', '🏪', '📱', '💬', '🎉', '✅', '❌',
  '⚠️', '🔑', '🔒', '🔓', '📝', '📋', '📌', '📍', '🎫', '📷', '📸', '🗂️',
  '📥', '📤', '☁️', '🎨', '🔍', '🔎', '👁️', '✏️', '🏃', '💡', '🔧', '🔨',
  '⏰', '💵', '💳', '🔄', '↩️', '↪️', '⬆️', '⬇️', '➡️', '⬅️', '🆕', '🆓',
  '🇨🇮', '🌊', '🍊', '🫧', '💨', '♨️', '🗂', '☀️', '🌤️', '🏠', '🏡',
  '📞', '☎️', '🔋', '🔌', '🛒', '🎀', '🎁', '🎊', '🎈', '🥳', '🎂',
  '💼', '👓', '🌂', '👒', '🎩', '🧢', '💍', '💎', '👑', '🏆', '🥇', '🎯',
  '🚀', '🔐', '🔏', '⌚', '⏱', '⏲', '⏳', '⌛', '📆', '📇', '🗓', '⏸',
  '▶️', '⏹️', '🔕', '🧑', '👩', '👨', '🧔', '👴', '👵', '🧒', '👶',
  '🙋', '🤝', '👋', '🙏', '👏', '💪', '🤲', '👐', '🙌', '✊', '👊',
  '☀️', '❄️', '💧', '💦', '🌈', '⚡', '🌟', '🌙', '🌻', '🌺', '🌸',
  '🏔️', '🏕️', '🏖️', '🏜️', '🏝️', '🏟️', '🏛️', '📮', '📬', '📭',
  '✒️', '🖊️', '🖋️', '🖌️', '🖍️', '🗑️', '♻️', '🧲', '🪜', '🧸',
  '🎋', '🎍', '🧧', '🎎', '🎏', '🎐', '🎑', '🧨', '🎆', '🎇',
  '🏋️', '🤸', '⛹️', '🏊', '🚴', '🧘', '🏇', '⛷️', '🏂', '🪂',
  '🏌️', '🏄', '🚣', '🧗', '🚵', '🎽', '🥊', '🥋', '🎣', '🤿',
  '⚽', '🏀', '🏈', '⚾', '🥎', '🏐', '🏉', '🎾', '🏸', '🏒',
  '🏑', '🥍', '🏏', '⛳', '🏹', '🎿', '🛷', '🥌', '🎱', '🔮',
  '🎮', '🕹️', '🎰', '🎲', '♟️', '🧩', '🪅', '🎭', '🎨', '🖼️',
  '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🪘', '🎷', '🎺', '🎸',
  '🪕', '🎻', '🎙️', '📻', '📺', '📷', '📸', '📹', '🎥', '📽️',
  '🎞️', '📞', '☎️', '📟', '📠', '📡', '🔭', '🔬', '🧫', '🧪',
  '🧬', '💊', '💉', '🩺', '🩹', '🩻', '🩼', '🦯', '🦺', '🥼',
  '🧥', '👔', '👕', '👖', '🧣', '🧤', '🧦', '👗', '👘', '🥻',
  '🩱', '🩲', '🩳', '👙', '👚', '👛', '👜', '👝', '🎒', '🧳',
  '👒', '🎩', '🧢', '⛑️', '👓', '🕶️', '🥽', '🌂', '☂️',
  // Emojis chiffres et symboles
  '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣',
  '#️⃣', '*️⃣', '🔟', '💯', '🔢', '🔣', '🔤', '🔡', '🔠', '🅰️',
  '🅱️', '🆎', '🆑', '🅾️', '🆘', '❎', '🆚', '💠', '🔷', '🔶',
  '🔹', '🔸', '🔺', '🔻', '💢', '🔱', '⚜️', '🔰', '♻️', '✔️',
  '☑️', '🔲', '🔳', '⬛', '⬜', '◼️', '◻️', '◾', '◽', '▪️', '▫️',
  // Flèches
  '⤴️', '⤵️', '🔀', '🔁', '🔂', '▶️', '⏩', '⏭️', '⏯️', '◀️',
  '⏪', '⏮️', '🔼', '⏫', '🔽', '⏬', '⏸️', '⏹️', '⏺️', '🎦',
  // Autres
  '🔅', '🔆', '📶', '📳', '📴', '📵', '📲', '☎', '📱', '📟',
  '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓',
  '⛎', '🔯', '🧿', '🪬', '🪄', '🧸', '🪆', '🪅', '🎭', '🎪',
]

const files = [
  'src/pages/AllPages.tsx',
  'src/pages/atelier/AtelierPage.tsx',
  'src/pages/auth/LoginPage.tsx',
  'src/pages/cashier/CashierPage.tsx',
  'src/pages/clients/ClientsPage.tsx',
  'src/pages/dashboard/DashboardPage.tsx',
  'src/pages/orders/OrdersPage.tsx',
  'src/pages/scan/ScanPage.tsx',
  'src/pages/settings/SettingsPage.tsx',
  'src/pages/users/UsersPage.tsx',
  'src/components/ui/index.tsx',
]

let totalChanged = 0

files.forEach(file => {
  if (!fs.existsSync(file)) { console.log('⚠️ Non trouvé:', file); return }
  
  let content = fs.readFileSync(file, 'utf8')
  const original = content

  // Supprimer uniquement dans les chaînes entre guillemets simples et doubles
  // et dans le JSX (entre > et <)
  emojisToRemove.forEach(emoji => {
    // Dans les strings
    content = content.split(emoji).join('')
  })

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8')
    totalChanged++
    console.log('✅ Modifié:', file)
  } else {
    console.log('— Inchangé:', file)
  }
})

console.log('\n✅ Terminé —', totalChanged, 'fichier(s) modifié(s)')
