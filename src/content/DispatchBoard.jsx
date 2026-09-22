// The dispatch board index — a bulletin board of station-authored posts.
//
// It borrows the shape of a link aggregator (flair tags, a filterable list,
// signal meters down the left) but nothing here is user-submitted and no
// number on this page is a vote. The S-meter reports how demanding a piece
// is; the flair is its subject. Both come from the manifest.

import { useState } from 'react'
import { DISPATCHES, FLAIRS } from './dispatches/manifest.js'
import { SignalMeter } from '../components/PageShell.jsx'

const MON = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
const fmt = (iso) => {
  const [y, m, d] = iso.split('-')
  return `${d} ${MON[Number(m) - 1]} ${y}`
}

export default function DispatchBoard() {
  // Constant initial state — the server render and the first client render
  // must match exactly.
  const [flair, setFlair] = useState('ALL')
  const shown = flair === 'ALL' ? DISPATCHES : DISPATCHES.filter((d) => d.flair === flair)

  return (
    <>
      <h1>THE DISPATCH BOARD</h1>
      <p className="lede">
        Field notes for operators — what nobody tells you before your first
        contact, why you stall at ten words a minute, and which of the things
        in your kit you will actually use.
      </p>
      <p>
        Everything posted here is written by the station. There are no
        accounts and no submissions, so nothing on this board is a vote or a
        comment count: the meter beside each title reports how demanding the
        piece is — <strong>S3</strong> if you can read it on your first day,
        <strong> S9</strong> if it assumes you already have a station on the
        air. New to all of this? Start with{' '}
        <a href="/learn">the primer</a>, then take the key for a turn.
      </p>

      <div className="board-filter" role="group" aria-label="Filter by subject">
        <button
          type="button"
          className={flair === 'ALL' ? 'chip is-on' : 'chip'}
          onClick={() => setFlair('ALL')}
          aria-pressed={flair === 'ALL'}
        >
          ALL <span className="chip-n">{DISPATCHES.length}</span>
        </button>
        {FLAIRS.map((f) => {
          const n = DISPATCHES.filter((d) => d.flair === f).length
          return (
            <button
              type="button"
              key={f}
              className={flair === f ? 'chip is-on' : 'chip'}
              onClick={() => setFlair(f)}
              aria-pressed={flair === f}
            >
              {f} <span className="chip-n">{n}</span>
            </button>
          )
        })}
      </div>

      <ol className="board-list">
        {shown.map((d) => (
          <li className="board-row" key={d.slug}>
            <div className="board-meter">
              <SignalMeter level={d.level} />
            </div>
            <div className="board-main">
              <div className="board-tagline">
                <span className={`flair flair-${d.flair.toLowerCase()}`}>{d.flair}</span>
                <span className="post-dot">·</span>
                <time dateTime={d.date}>{fmt(d.date)}</time>
                <span className="post-dot">·</span>
                <span>{d.readMin} MIN COPY</span>
              </div>
              <h2 className="board-title">
                <a href={`/dispatches/${d.slug}`}>{d.title}</a>
              </h2>
              <p className="board-summary">{d.summary}</p>
            </div>
          </li>
        ))}
      </ol>

      {shown.length === 0 ? (
        <p className="board-empty">Nothing filed under that heading yet.</p>
      ) : null}

      <h2>ABOUT THIS BOARD</h2>
      <p>
        Shortwave is a field-radio simulator, and the board is where the
        things it cannot teach by simulation get written down. A browser can
        give you a key, a decoder and someone on the other end of a
        frequency. It cannot tell you how high to hang a dipole, why forty
        metres goes long after dark, or what to say when a stranger finally
        answers your CQ. Those get posted here.
      </p>
      <p>
        Corrections are welcome and get made — these pages are edited rather
        than archived, so if something here is wrong, say so. The reference
        material lives separately in{' '}
        <a href="/learn">the primer</a>, <a href="/prosigns">prosigns</a>,{' '}
        <a href="/q-codes">Q codes</a> and the{' '}
        <a href="/morse-code-chart">chart</a>.
      </p>
    </>
  )
}
