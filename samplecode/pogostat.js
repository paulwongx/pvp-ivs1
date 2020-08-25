cpmultiple = [0.094, 0.1351374318, 0.16639787, 0.192650919, 0.21573247, 0.2365726613, 0.25572005, 0.2735303812, 0.29024988, 0.3060573775, 0.3210876, 0.3354450362, 0.34921268, 0.3624577511, 0.3752356, 0.387592416, 0.39956728, 0.4111935514, 0.4225, 0.4329264091, 0.44310755, 0.4530599591, 0.4627984, 0.472336093, 0.48168495, 0.4908558003, 0.49985844, 0.508701765, 0.51739395, 0.5259425113, 0.5343543, 0.5426357375, 0.5507927, 0.5588305862, 0.5667545, 0.5745691333, 0.5822789, 0.5898879072, 0.5974, 0.6048236651, 0.6121573, 0.6194041216, 0.6265671, 0.6336491432, 0.64065295, 0.6475809666, 0.65443563, 0.6612192524, 0.667934, 0.6745818959, 0.6811649, 0.6876849038, 0.69414365, 0.70054287, 0.7068842, 0.7131691091, 0.7193991, 0.7255756136, 0.7317, 0.7347410093, 0.7377695, 0.7407855938, 0.74378943, 0.7467812109, 0.74976104, 0.7527290867, 0.7556855, 0.7586303683, 0.76156384, 0.7644860647, 0.76739717, 0.7702972656, 0.7731865, 0.7760649616, 0.77893275, 0.7817900548, 0.784637, 0.7874736075, 0.7903]
cpmultiple_b = [0.094, 0.1351374318, 0.16639787, 0.192650919, 0.21573247, 0.2365726613, 0.25572005, 0.2735303812, 0.29024988, 0.3060573775, 0.3210876, 0.3354450362, 0.34921268, 0.3624577511, 0.3752356, 0.387592416, 0.39956728, 0.4111935514, 0.4225, 0.4329264091, 0.44310755, 0.4530599591, 0.4627984, 0.472336093, 0.48168495, 0.4908558003, 0.49985844, 0.508701765, 0.51739395, 0.5259425113, 0.5343543, 0.5426357375, 0.5507927, 0.5588305862, 0.5667545, 0.5745691333, 0.5822789, 0.5898879072, 0.5974, 0.6048236651, 0.6121573, 0.6194041216, 0.6265671, 0.6336491432, 0.64065295, 0.6475809666, 0.65443563, 0.6612192524, 0.667934, 0.6745818959, 0.6811649, 0.6876849038, 0.69414365, 0.70054287, 0.7068842, 0.7131691091, 0.7193991, 0.7255756136, 0.7317, 0.7347410093, 0.7377695, 0.7407855938, 0.74378943, 0.7467812109, 0.74976104, 0.7527290867, 0.7556855, 0.7586303683, 0.76156384, 0.7644860647, 0.76739717, 0.7702972656, 0.7731865, 0.7760649616, 0.77893275, 0.7817900548, 0.784637, 0.7874736075, 0.7903, 0.792803946731, 0.79530001, 0.797803921997, 0.8003, 0.802803892616, 0.8053, 0.807803863507, 0.81029999, 0.812803834725, 0.81529999]
cpmultiple2 = cpmultiple.map(function(x) {
    return Math.pow(x, 2);
});
cpmultiple4 = cpmultiple2.map(function(x) {
    return Math.pow(x, 2);
});

cpmultiple_b2 = cpmultiple_b.map(function(x) {
    return Math.pow(x, 2);
});
cpmultiple_b4 = cpmultiple_b2.map(function(x) {
    return Math.pow(x, 2);
});

function binarySearch(ar, num) {
    var m = 0;
    var n = ar.length - 1;
    while (m <= n) {
        var k = (n + m) >> 1;
        if (ar[k] < num) {
            m = k + 1;
        } else if (ar[k] > num) {
            n = k - 1;
        } else {
            return k;
        }
    }
    return m - 1;
}

function cp(at, df, st, multiple2) {
    return Math.floor((at * Math.sqrt(df * st) * multiple2) / 10);
}

function lvlCap(at, df, st, targetCP, cpm4, max_lvl) {
    cap = binarySearch(cpm4, (targetCP + 1) * (targetCP + 1) * 100 / (at * at * df * st))
    return cap > max_lvl ? max_lvl : cap;
}

function arrComp(a, b) {
    if (a[0] < b[0])
        return 1;
    if (a[0] > b[0])
        return -1;
    return 0;
}

function pvpivcalc(cp_cap, poke, iv_min, s_at, s_df, s_st, max_lvl, sprod) {
    var cpm4, cpm2;
    cpm4 = cpmultiple_b4;
    cpm2 = cpmultiple_b2;
    cpm = cpmultiple_b;
    iv_combos = []
    for (at = iv_min; at <= 15; at++)
        for (df = iv_min; df <= 15; df++)
            for (st = iv_min; st <= 15; st++)
                iv_combos.push({
                    "at": at,
                    "df": df,
                    "st": st
                })
    products = []
    for (i = 0; i < iv_combos.length; i++) {
        at = Math.floor(poke['at']) + iv_combos[i]['at'];
        df = Math.floor(poke['df']) + iv_combos[i]['df'];
        st = Math.floor(poke['st']) + iv_combos[i]['st'];
        lvl = lvlCap(at, df, st, cp_cap, cpm4, max_lvl);
        stat_product = cpm2[lvl] * at * df * Math.floor(cpm[lvl] * st);
        products.push([stat_product, lvl, iv_combos[i]['at'], iv_combos[i]['df'], iv_combos[i]['st']]);
    }
    products = products.sort(arrComp);
    console.log(products)

    rank = null
    for (i = 0; i < products.length; i++) {
        if (products[i][2] == s_at && products[i][3] == s_df && products[i][4] == s_st)
            rank = i + 1
    }

    at = Math.floor(poke['at']) + s_at;
    df = Math.floor(poke['df']) + s_df;
    st = Math.floor(poke['st']) + s_st;
    lvl = lvlCap(at, df, st, cp_cap, cpm4, max_lvl);
    stat_product = cpm2[lvl] * at * df * Math.floor(cpm[lvl] * st);

    if (rank == null) {
        for (i = 0; i < products.length; i++) {
            if (products[i][0] > stat_product)
                rank = i
        }
    }

    p_scale = (stat_product - products[products.length - 1][0]) / (products[0][0] - products[products.length - 1][0]);

    ret = '<div class="row"><div class="col-2">rank</div><div class="col-1">att</div><div class="col-1">def</div><div class="col-1">hp</div><div class="col-2">lvl</div><div class="col-2">cp</div><div class="col-2">%perfect</div></div>';
    ret += '<div class="row" style="border-top: 1px black solid; background-color: hsl(' + Math.round(90 * p_scale) + ',100%,50%)"><div class="col-2">' + rank + '</div><div class="col-1">' + s_at + '</div><div class="col-1">' + s_df + '</div><div class="col-1">' + s_st + '</div><div class="col-2">' + (lvl / 2 + 1) + '</div><div class="col-2">' + cp(at, df, st, cpm2[lvl]) + '</div><div class="col-2">' + Math.round(stat_product / products[0][0] * 100000) / 1000 + '%' + (sprod ? ' (' + Math.round(stat_product) + ')' : '') + '</div></div>';
    for (i = 0; i < 25; i++) {
        ret += '<div class="row" style="border-top: 1px black solid;"><div class="col-2">' + (i + 1) + '</div><div class="col-1">' + products[i][2] + '</div><div class="col-1">' + products[i][3] + '</div><div class="col-1">' + products[i][4] + '</div><div class="col-2">' + (products[i][1] / 2 + 1) + '</div><div class="col-2">' + cp(Math.floor(poke['at']) + products[i][2], Math.floor(poke['df']) + products[i][3], Math.floor(poke['st']) + products[i][4], cpm2[products[i][1]]) + '</div><div class="col-2">' + Math.round(products[i][0] / products[0][0] * 100000) / 1000 + '%' + (sprod ? ' (' + Math.round(products[i][0]) + ')' : '') + '</div></div>';
    }

    return ret;

}
