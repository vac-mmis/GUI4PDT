<template>
    <v-container class="about">
        <h1>About</h1>
        <p class="text-body-1">
            The User Interface for Probabilistic Digital Twins in Underwater Environments project
            focuses on developing a powerful and intuitive interface for visualizing and interacting
            with probabilistic digital twins in underwater settings.
        </p>
        <br />
        <p>
            The demo shows a model of the
            <a target="_blank" href="https://www.riff-nienhagen.de/index_en.shtml"
                >Artificial Reef</a
            >, part of the
            <a
                targes="_blank"
                href="https://www.smart-ocean.fraunhofer.de/de/digital-ocean-lab.html"
                >Digital Ocean</a
            >
            Lab near Rostock, Nienhagen.
        </p>
        <v-img width="30%" src="karte_riff_nienhagen.png"></v-img>

        <v-divider class="mt-6 mb-4"></v-divider>
        <h1>Credits</h1>
        <div class="text-body-3">
            <table>
                <tbody>
                    <tr>
                        <td class="credits-left">Mathieu Dupoux</td>
                        <td class="credits-right">Project Development</td>
                    </tr>
                    <tr>
                        <td class="credits-left">Felix Gratzkowski</td>
                        <td class="credits-right">Project Development</td>
                    </tr>
                    <tr>
                        <td class="credits-left">Maximilian Popko</td>
                        <td class="credits-right">Project Development</td>
                    </tr>
                    <tr>
                        <td class="credits-left">Sebastian Bader</td>
                        <td class="credits-right">Supervision</td>
                    </tr>
                    <tr>
                        <td class="credits-left">
                            <a
                                target="_blank"
                                href="https://3dwarehouse.sketchup.com/user/0706271118793834625847623/styleK%C3%9CSTE?hl=de"
                                >styleKÜSTE at 3D Warehouse</a
                            >
                        </td>
                        <td class="credits-right">Research station model</td>
                    </tr>
                    <tr>
                        <td class="credits-left">
                            <a target="_blank" href="https://sketchfab.com/veeds3d"
                                >Veeds at Sketchfab</a
                            >
                        </td>
                        <td class="credits-right">ROV 3d model</td>
                    </tr>
                    <tr>
                        <td class="credits-left">
                            <a target="_blank" href="https://www.riff-nienhagen.de/"
                                >www.riff-nienhagen.de</a
                            >
                        </td>
                        <td class="credits-right">Reef data</td>
                    </tr>
                    <tr>
                        <td class="credits-left">
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://www.freepik.com/free-vector/dark-blue-grunge-texture-design_853759.htm"
                                >dotstudio at Freepik</a
                            >
                        </td>
                        <td class="credits-right">ROV texture</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-container>
</template>

<style scoped>
.credits-left {
    padding-right: 20px;
}
</style>
