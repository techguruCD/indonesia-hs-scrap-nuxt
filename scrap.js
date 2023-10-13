import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import axios from "axios";

import { Lists } from "./server/db/schema/Lists.js"
const API_TOKEN = 'Basic aW5zd18yOmJhYzJiYXM2'

const dbPath = process.env.DB_PAHT || 'db.sqlite';
const sqlite = new Database(dbPath)
const _db = drizzle(sqlite)

axios.get('https://api.insw.go.id/api/cms/hscode?keyword=&size=10&from=0', { headers: { Authorization: API_TOKEN } })
    .then(({ data: res }) => {
        let result = res.data[0].result;
        const newRows = [];
        const promise_array = [];
        result.forEach(row => {
            newRows.push({
                _index: row._index,
                _id: row._id,
                _score: row._score,

                _source_id_btbmi: row._source.id_btbmi,
                _source_hs_code: row._source.hs_code,
                _source_uraian_en: row._source.uraian_en,
                _source_uraian_id: row._source.uraian_id,
                _source_timestamp: row._source['@timestamp'],
                _source_version: row._source['@version'],
                _source_hs_code_format: row._source.hs_code_format,
                _source_bm_mfn: row._source.bm_mfn,
                sort: row.sort
            })
            promise_array.push(axios.get(`https://api.insw.go.id/api-prod-ba/ref/hscode/komoditas?hs_code=${row._source.hs_code_format}`, { headers: { Authorization: API_TOKEN } }))
        })
        Promise.all(promise_array)
            .then(result => {
                result.forEach(({ data: res }, index) => {
                    const mfn = res.data[0].mfn[0];
                    Object.assign(newRows[index], {
                        mfn_regulation: mfn.regulation,
                        mfn_issued_at: mfn.issued_at,
                        mfn_effective_at: mfn.effective_at,
                        mfn_bm: JSON.stringify(mfn.bm),
                        mfn_ppn: JSON.stringify(mfn.ppn),
                        mfn_ppnbm: JSON.stringify(mfn.ppnbm),
                        mfn_cukai: JSON.stringify(mfn.cukai),
                        mfn_ad: JSON.stringify(mfn.ad),
                        mfn_tp: JSON.stringify(mfn.tp),
                        mfn_im: JSON.stringify(mfn.im),
                        mfn_pm: JSON.stringify(mfn.pm),
                        mfn_pph: JSON.stringify(mfn.pph),
                        mfn_ppnbk: JSON.stringify(mfn.ppnbk),
                        mfn_tarif_dana_sawit: JSON.stringify(mfn.tarif_dana_sawit),
                        mfn_notes: JSON.stringify(mfn.notes),
                        mfn_flag_sd: JSON.stringify(mfn.flag_sda),
                    })
                })
                _db.insert(Lists).values(newRows)
                    .then(() => {
                        console.log("done")
                    }).catch(err => {
                        console.log(err)
                    })
            }).catch(err => {
                console.log(err)
            })
    })
    .catch(err => {
        console.log(err)
    })