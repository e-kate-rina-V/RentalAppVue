<template>
    <div class="page-container">
        <header id="mainlandlord-header">
            <section>
                <div id="main-name">
                    <img id="main-icon" src="../assets/img/bee_hive_icon.png" alt="hive" />
                    <h2>HiveFind</h2>
                </div>
            </section>

            <section id="add-section">
                <button class="btn btn-dark" type="button">Розмістити оголошення</button>
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
    name: 'MainLandlord'
};
</script>

<style scoped>
#mainlandlord-header {
    gap: 60%;
    padding-bottom: 1%;
}

</style>