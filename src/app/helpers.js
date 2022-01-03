import {charts, debug, player, playerStats} from "./globals.js";

export function keyLogger(ev, down) {
    switch (ev.key) {
        case 'w':
        case 'z':
        case 'ArrowUp':
            player.controls.attack = (player.controls.attack === 2) ? (down ? 2 : false) : down;
            break;
        case 's':
        case 'ArrowDown':
            player.controls.down = down;
            break;
        case 'a':
        case 'q':
        case 'ArrowLeft':
            player.controls.left = down;
            break;
        case 'd':
        case 'ArrowRight':
            player.controls.right = down;
            break;
        case ' ':
            ev.preventDefault();
            player.controls.jump = down;
            break;
    }
}

export function formatUnixTime(timestamp, timezone) {
    // time is set to a simple format for easy use in calculations
    let date = new Date((timestamp + timezone) * 1000);
    return date.getUTCHours() * 100 + date.getUTCMinutes();
}

export function formatData(data, stats, charts, table, global) {
    stats.innerHTML = '';
    table.innerHTML = '';
    let values = {
        fastestWin: '-',
        fastestDeath: '-',
        fastestNoHit: '-',
        totalDamageTaken: 0,
        totalDamageDealt: 0,
        totalWins: 0,
        totalDeaths: 0,
        totalHits: 0,
        totalAttacks: 0,
        kills: {
            _9: 0,
            _8: 0,
            _7: 0,
            _6: 0,
            _5: 0,
            _4: 0,
            _3: 0,
            _2: 0,
            _1: 0,
            _0: 0
        }
    }
    data.forEach(row => {
        if (row.user === debug.userId || global) {
            values.totalDamageTaken += row.damageTaken;
            values.totalDamageDealt += row.damageDealt;
            values.totalAttacks += row.attacks;
            values.totalHits += row.attacksHit;
            if (row.kills === 10) {
                values.totalWins++;
                if (values.fastestWin === '-' || values.fastestWin > row.timeTaken) {
                    values.fastestWin = row.timeTaken;
                }
                if (row.damageTaken === '-' && (values.fastestNoHit === 0 || values.fastestNoHit > row.timeTaken)) {
                    values.fastestNoHit = row.timeTaken;
                }
            } else {
                values.totalDeaths++;
                if (values.fastestDeath === '-' || values.fastestDeath > row.timeTaken) {
                    values.fastestDeath = row.timeTaken;
                }
                switch (row.kills) {
                    case 9:
                        values.kills._9++;
                        break;
                    case 8:
                        values.kills._8++;
                        break;
                    case 7:
                        values.kills._7++;
                        break;
                    case 6:
                        values.kills._6++;
                        break;
                    case 5:
                        values.kills._5++;
                        break;
                    case 4:
                        values.kills._4++;
                        break;
                    case 3:
                        values.kills._3++;
                        break;
                    case 2:
                        values.kills._2++;
                        break;
                    case 1:
                        values.kills._1++;
                        break;
                    case 0:
                        values.kills._0++;
                        break;
                }
            }
            writeTable(table, row, global);
        }
    });
    writeData(stats, values);
    updateCharts(charts, values);
}

function writeData(stats, values) {
    stats.innerHTML = `
            <div>
                <p>Fastest Win: ${values.fastestWin} s</p>
                <p>Total Damage</p>
            </div>
            <div>
                <p>Fastest Death: ${values.fastestDeath} s</p>
                <p>Taken: ${values.totalDamageTaken}</p>
            </div>
            <div>
                <p>Fastest No Hit: ${values.fastestNoHit} s</p>
                <p>Dealt: ${values.totalDamageDealt}</p>
            </div>`;

}

function writeTable(table, row, showId) {
    table.innerHTML += `
                <tr>
                    ${showId ? `<td>${row.user}</td>` : ``}
                    <td>${row.timeTaken}</td>
                    <td>${row.kills}</td>
                    <td>${row.attacks}</td>
                    <td>${row.attacksHit}</td>
                    <td>${row.damageTaken}</td>
                    <td>${row.damageDealt}</td>
                </tr>`;
}

function updateCharts(charts, values) {
    charts.score.data.datasets[0].data = [values.totalWins, values.totalDeaths];
    charts.score.update();
    charts.attacks.data.datasets[0].data = [values.totalHits, values.totalAttacks - values.totalHits];
    charts.attacks.update();
    charts.kills.data.datasets[0].data = [values.kills._9, values.kills._8, values.kills._7, values.kills._6, values.kills._5, values.kills._4, values.kills._3, values.kills._2, values.kills._1, values.kills._0]
    charts.kills.update();
}

export function getStats() {
    fetch('http://localhost:3000/stats')
        .then((response) => {
            return response.json();
        })
        .then((stats) => {
            formatData(stats, document.getElementById('localStats'), {
                    score: charts.chartLocalScore,
                    attacks: charts.chartLocalAttacks,
                    kills: charts.chartLocalKills
                }, document.getElementById('localTableData'), false
            );
            formatData(stats, document.getElementById('globalStats'), {
                    score: charts.chartGlobalScore,
                    attacks: charts.chartGlobalAttacks,
                    kills: charts.chartGlobalKills,
                }, document.getElementById('globalTableData'), true
            );
        });
}

export function postStats() {
    fetch('http://localhost:3000/stats', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            user: debug.userId,
            timeTaken: playerStats.timeTaken,
            kills: playerStats.kills,
            attacks: playerStats.attacks,
            attacksHit: playerStats.attacksHit,
            damageTaken: playerStats.damageTaken,
            damageDealt: playerStats.damageDealt,
        })
    })
        .then(() => {
            getStats();
            if (playerStats.kills === 10) {
                document.getElementById('modalTitle').innerText = 'Victory!';
            } else {
                document.getElementById('modalTitle').innerText = 'Failure!';
            }
        });
}

export function collision(entity, object, isAttack) {
    if (entity.hasCollision && (object.hasCollision || (Object.getPrototypeOf(Object.getPrototypeOf(object)).constructor.name === 'TileEntity' && isAttack))) {
        let values = {
            up: entity.collision.up,
            down: entity.collision.down,
            left: entity.collision.left,
            right: entity.collision.right
        }
        if (!entity.collision.up) {
            entity.collision.up =
                entity.frame.x < object.frame.x + object.frame.width &&
                entity.frame.x + entity.frame.width > object.frame.x &&
                entity.frame.y < object.frame.y &&
                entity.frame.y + entity.frame.height >= object.frame.y &&
                object.hasCollision !== 2;
            if (entity.collision.up && (entity.frame.y + entity.frame.height - object.frame.y <= 30) && object.constructor.name === 'Tile') {
                entity.frame.y = object.frame.y - entity.frame.height;
            }
        }
        if (!entity.collision.down) {
            entity.collision.down =
                entity.frame.x < object.frame.x + object.frame.width &&
                entity.frame.x + entity.frame.width > object.frame.x &&
                entity.frame.y <= object.frame.y + object.frame.height &&
                entity.frame.y > object.frame.y &&
                entity.frame.y + entity.frame.height > object.frame.y + object.frame.height;
            if (object.hasCollision === 2 && entity.controls.down) {
                entity.collision.down = false;
            } else if (entity.collision.down && (object.frame.y + object.frame.height - entity.frame.y <= 30) && object.constructor.name === 'Tile') {
                entity.frame.y = object.frame.y + object.frame.height;
            }
        }
        if (!entity.collision.left) {
            entity.collision.left =
                entity.frame.x <= object.frame.x + object.frame.width &&
                entity.frame.x + entity.frame.width > object.frame.x + object.frame.width &&
                entity.frame.y < object.frame.y + object.frame.height &&
                entity.frame.y + entity.frame.height > object.frame.y &&
                object.hasCollision !== 2;
            if (entity.collision.left && (object.frame.x + object.frame.width - entity.frame.x <= 20) && object.constructor.name === 'Tile') {
                entity.frame.x = object.frame.x + object.frame.width;
            }
        }
        if (!entity.collision.right) {
            entity.collision.right =
                entity.frame.x < object.frame.x &&
                entity.frame.x + entity.frame.width >= object.frame.x &&
                entity.frame.y < object.frame.y + object.frame.height &&
                entity.frame.y + entity.frame.height > object.frame.y &&
                object.hasCollision !== 2;
            if (entity.collision.right && (entity.frame.x + entity.frame.width - object.frame.x <= 20) && object.constructor.name === 'Tile') {
                entity.frame.x = object.frame.x - entity.frame.width;
            }
        }
        if (
            entity.collision.left && entity.collision.right &&
            entity.frame.x <= object.frame.x &&
            entity.frame.x + entity.frame.width >= object.frame.x + object.frame.width &&
            !isAttack
        ) {
            entity.collision.left = false;
            entity.collision.right = false;
        }
        if (
            ((!values.up && entity.collision.up) || (!values.down && entity.collision.down) || (!values.left && entity.collision.left) || (!values.right && entity.collision.right)) &&
            ((entity.constructor.name !== 'Tile' && object.constructor.name === 'Hero') || (entity.constructor.name === 'Hero' && object.constructor.name !== 'Tile'))
        ) {
            return object;
        } else return false;
    } else return false;
}