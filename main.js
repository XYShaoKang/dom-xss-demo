import DOMPurify from 'dompurify'
import './style.css'

function initEditor(id, isSafe) {
  /**
   * @type {HTMLDivElement}
   */
  const root = document.getElementById(id)
  /**
   * @type {HTMLTextAreaElement}
   */
  const edit = root.querySelector('.edit')
  /**
   * @type {Window}
   */
  const preview = isSafe ? safe : unsafe
  /**
   * @type {HTMLDivElement}
   */
  const previewSource = root.querySelector('.preview>.source')
  /**
   * @type {HTMLButtonElement}
   */
  const submitStr = root.querySelector('.submit-str')
  /**
   * @type {HTMLButtonElement}
   */
  const submitDOM = root.querySelector('.submit-dom')
  let text = ''

  function render(text) {
    preview.window.add(text)
    previewSource.textContent = text
  }

  edit.addEventListener('keydown', function (e) {
    if (e.code === 'Tab') {
      // Tab 的默认功能是会切换到下一个 tabindex 的元素,为了编辑方便,将 Tab 功能改为输入两个空格.
      e.preventDefault()
      const start = this.selectionStart
      this.value = this.value.slice(0, start) + '  ' + this.value.slice(start)
      this.selectionStart = this.selectionEnd = start + 2
    }
  })
  edit.addEventListener('change', (e) => {
    text = edit.value
  })
  submitStr.addEventListener('click', (e) => {
    // 插入为文本时
    // 安全的方式先替换 `<>` 字符实体,再使用
    if (isSafe) render(text.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
    // 不安全的方式直接使用源文本
    else render(text)
  })
  submitDOM &&
    submitDOM.addEventListener('click', (e) => {
      // 安全的插入为 DOM
      // 先清洗掉有风险的代码
      render(DOMPurify.sanitize(text))
    })
}

void (function () {
  initEditor('unsafe', false)
  initEditor('safe', true)
})()
