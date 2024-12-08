<template>
  <footer>
    <div id="footer-text" class="d-flex flex-row">
      <p>Ⓒ 2024 HiveFind, Inc</p>
      <span>·</span>
      <a href="#">Конфіденційність</a>
      <span>·</span>
      <a href="#">Умови</a>
    </div>
  </footer>
</template>

<style>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-left: 5%;
  display: grid;
  gap: 20%;
  color: whitesmoke;
  background-color: black;
  z-index: 2;
}

#footer-text {
  gap: 10px;
  padding-top: 1%;
  align-items: baseline;
}

#footer-text a {
  color: whitesmoke;
  text-decoration: none;
}

.footer-text a:hover {
  text-decoration: underline;
}
</style>
