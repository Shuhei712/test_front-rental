export default async function ({ params, query, $config, $axios, redirect }) {
  const TYPE_REDIRECT = 0
  const TYPE_PARAM_ACTION = 1

  const code = params.id
  const dig = query.dig

  const param = new URLSearchParams()
  param.append('ProjectKey', $config.PROJECT_KEY)
  param.append('LangType', $config.LANG_JAPANESE)
  param.append('EmbeddedCode', code)
  param.append('DigitCode', dig)

  const res = await $axios.$post('get_qr_embedded_info.php', param)
  const embeddedInfo = res.EmbeddedInfo

  switch (embeddedInfo.ActionType) {
    case TYPE_REDIRECT:
      redirect(embeddedInfo.ActionURL)
      break
    case TYPE_PARAM_ACTION:
      redirect(embeddedInfo.ActionURL)
      break
    default:
      redirect('/')
      break
  }
}
