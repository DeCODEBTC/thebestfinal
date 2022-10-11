import styled from 'styled-components'

export const Container = styled.div.attrs(() => ({
  className: 'container',
}))`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: max-content;
  align-items: center;
  max-width: 100vw;
  justify-content: center;

  img {
    width: 100%;
  }

  .card {
    width: 100%;

    .logo-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-bottom: 0.5em;
      .logo {
        margin-right: 0.5em;
        width: 0.8em;
        height: auto;
      }
    }
    .btn {
      width: 100%;
      margin-bottom: 0.5em;
      :hover {
        color: white;
      }
    }
  }
`
