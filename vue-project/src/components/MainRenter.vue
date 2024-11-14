<template>
    <div class="page-container">
        <header id="mainrenter-header">
            <section>
                <div id="main-name">
                    <img id="main-icon" src="../assets/img/bee_hive_icon.png" alt="hive" />
                    <h2>HiveFind</h2>
                </div>
            </section>

            <section id="search-section">
                <input type="search" id="search" placeholder="Почати пошук" />
                <img id="search-sign" src="../assets/img/search-sign.png" alt="search-sign" />
            </section>
        </header>

        <main id="main-landlord-body">
        </main>

        <footer>
            <div class="footer-text">
                <p>Ⓒ 2024 HiveFind, Inc</p>
                <p>·</p>
                <a href="#">Конфіденційність</a>
                <p>·</p>
                <a href="#">Умови</a>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'MainRenter'
};
</script>

<style scoped>
#mainrenter-header {
    gap: 50%;
    padding-bottom: 1%;
}

</style>