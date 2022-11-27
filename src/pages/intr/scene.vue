<template>
    <ul class="scene-list">
        <!--<li class="scene-item">
            <div class="scene-area">
                <span class="voice"></span>
                <p class="scene-name">语音播放</p>
                <p class="scene-title">通过手机或音箱等听书时，可为用户提供不同特色的声音</p>
            </div>
        </li>-->
        <li class="scene-item"
            v-for="(item, key) in scenes"
            :key="key"
        >
            <div class="scene-area">
                <span :class="item.icon"></span>
                <p class="scene-name">{{item.name}}</p>
                <p class="scene-title">{{item.intr}}</p>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'scene',
        data() {
            return {}
        },
        props: {
            scenes: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .scene-list {
        width: 100%;
        text-align: center;
        color: $cor0;
        font-size: $fzn;
        text-align: center;

        .scene-item {
            display: inline-block;
            width: 260px;
            height: 204px;
            padding: 0 20px;
            margin-right: 40px;
            vertical-align: top;
            background-color: $bg6;
            &:last-child {
                margin-right: 0;
            }

            .scene-area {
                width: 100%;
                height: 100%;
                @include flex_layout(column, center, center);

                @each $icon in voice, title, live, discern_face, supervise, player, preside, listen {
                    .#{$icon} {
                        width: 50px;
                        height: 46px;
                        margin-bottom: 20px;
                        background: url("#{$iconPath}/#{$icon}.png") center center no-repeat;
                    }
                }

                .scene-name {
                    margin-bottom: 10px;
                    font-size: $fzbl;
                }

                .scene-title {
                    height: 44px;
                    line-height: 22px;
                    font-size: $fzn;
                    color: $cor7;
                    overflow: hidden;
                }
            }
        }
    }
</style>