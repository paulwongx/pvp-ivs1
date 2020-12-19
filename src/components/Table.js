import React from 'react'
import 'components/Table.css';

function Table(props) {

    function addRows() {

        let table = props.table;
        let rows = [];

        for (let i=0; i<26; i++) {
            let children = [];
            children.push(<td key={`${i}-rnk`}>{table[i].rank}</td>);
            children.push(<td key={`${i}-lvl`}>{table[i].level}</td>);
            children.push(<td key={`${i}-cp`}>{table[i].cp}</td>);
            children.push(<td key={`${i}-iv`}>{`${table[i].ivs.atk} / ${table[i].ivs.def} / ${table[i].ivs.hp}`}</td>);
            children.push(<td key={`${i}-atk`}>{table[i].attack}</td>);
            children.push(<td key={`${i}-def`}>{table[i].defense}</td>);
            children.push(<td key={`${i}-hp`}>{table[i].stamina}</td>);
            children.push(<td key={`${i}-sp`}>{table[i].sp}</td>);
            children.push(<td key={`${i}-per`}>{table[i].percentage}</td>);

            rows.push(<tr key={i+1}>{children}</tr>);

        }

        return rows;

    }

    return (
        <div>
            <div class="output-title">
                {props.league !== "Little" && <img src={require(`images/${props.league.toLowerCase()}_league.png`)} width="100rem" alt={`${props.league}_league_banner`}/>}
                <h2>{props.league} League</h2>
            </div>
            <div className="results">
                <table className="table">
                    <thead key="thead">
                        <tr key="header">
                            <th scope="col">Rank</th>
                            <th scope="col">Level</th>
                            <th scope="col">CP</th>
                            <th scope="col">IVs</th>
                            <th scope="col">Attack</th>
                            <th scope="col">Defense</th>
                            <th scope="col">HP</th>
                            <th scope="col">Stat Product</th>
                            <th scope="col">Percentage</th>
                        </tr>
                    </thead>
                    <tbody key="tbody">
                        {(props.table.length !== 0) && addRows()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
