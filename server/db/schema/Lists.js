import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const Lists = sqliteTable('Classes', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    
    _index: text('_index'),
    _id: text('_id'),
    _score: text('_score'),

    _source_id_btbmi: integer('_source_id_btbmi'),
    _source_hs_code: text('_source_hs_code'),
    _source_uraian_en: text('_source_uraian_en'),
    _source_uraian_id: text('_source_uraian_id'),
    _source_timestamp: text('_source_timestamp'),
    _source_version: text('_source_version'),
    _source_hs_code_format: text('_source_hs_code_format'),
    _source_bm_mfn: text('_source_bm_mfn'),

    sort: text('_sort'),
    
    mfn_regulation: text('mfn_regulation'),
    mfn_issued_at: text('mfn_issued_at'),
    mfn_effective_at: text('mfn_effective_at'),
    mfn_bm: text('mfn_bm'),
    mfn_ppn: text('mfn_ppn'),
    mfn_ppnbm: text('mfn_ppnbm'),
    mfn_cukai: text('mfn_cukai'),
    mfn_ad: text('mfn_ad'),
    mfn_tp: text('mfn_tp'),
    mfn_im: text('mfn_im'),
    mfn_pm: text('mfn_pm'),
    mfn_pph: text('mfn_pph'),
    mfn_ppnbk: text('mfn_ppnbk'),
    mfn_tarif_dana_sawit: text('mfn_tarif_dana_sawit'),
    mfn_notes: text('mfn_notes'),
    mfn_flag_sd: text('mfn_flag_sd')
})