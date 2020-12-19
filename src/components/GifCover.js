import { html, css } from '../lib/templates'

export default class GifCover extends HTMLElement {
  constructor() {
    super()

    this.url = this.getAttribute('url')
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  getStyles() {
    return css`
      :host {
        display: block;
      }

      .gif-cover-image {
        height: 150px;
      }
    `
  }

  render() {
    this.shadowRoot.innerHTML = html`
      <style>${this.getStyles()}</style>

      <img
        class="gif-cover-image"
        src="${this.url}"
        alt="A GIF image"
      />
    `
  }
}

customElements.define('gif-cover', GifCover)
