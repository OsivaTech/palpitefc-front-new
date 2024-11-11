export const GA_TRACKING_ID = 'G-XH7QPE19PE'

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}

export const handleAdClick = (action, category, label, value) => {
  event({
    action,
    category,
    label,
    value,
  })
}
