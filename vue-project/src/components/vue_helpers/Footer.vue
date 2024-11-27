<template>
    <footer>
        <div class="footer-text">
            <p>Ⓒ 2024 HiveFind, Inc</p>
            <p>·</p>
            <a href="#">Конфіденційність</a>
            <p>·</p>
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
}

.footer-text {
    display: flex;
    gap: 10px;
    padding-top: 1%;
}

.footer-text a {
    color: whitesmoke;
    text-decoration: none;
}

.footer-text a:hover {
    text-decoration: underline;
}
</style>