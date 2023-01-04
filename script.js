let url =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

let gameData

let svg = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

let drawMap = () => {
    let hierarchy = d3.hierarchy(gameData, (node) => {
        return node.children})
    .sum((node) => {return node.value})
    .sort((a, b) => {return b.value - a.value})

    let treemap = d3.treemap().size([600, 600]);

    treemap(hierarchy);

    let tiles = hierarchy.leaves()
    let block = svg.selectAll('g')
        .data(tiles)
        .enter()
        .append('g')
        .attr('transform', (d) => {
            return 'translate(' + d.x0 + ',' + d.y0 + ')'
        })

    block.append('rect')
        .attr('class', 'tile')
        .attr('fill', (d) => {
            let category = d.data.category
            console.log(category)
            if (category === 'Wii') {
                return 'FireBrick'
            } else if (category === 'DS') {
                return 'crimson'
            } else if (category === 'SNES') {
                return 'red'
            } else if (category === 'GB') {
                return 'tomato'
            } else if (category === 'NES') {
                return 'IndianRed'
            } else if (category === '3DS'){
                return 'LightCoral'
            } else if (category === 'N64') {
                return 'Salmon'
            } else if (category === 'GBA') {
                return 'DarkSalmon'
            } else if (category === 'PS') {
                return 'lightblue'
            } else if (category === 'PS2') {
                return 'skyblue'
            } else if (category === 'PS3') {
                return 'lightskyblue'
            } else if (category === 'PS4') {
                return 'deepskyblue'
            } else if (category === 'PSP') {
                return 'dodgerblue'
            } else if (category === 'X360') {
                return 'green'
            } else if (category === 'XB') {
                return 'forestgreen'
            } else if (category === 'XOne') {
                return 'darkgreen'
            } else if (category === '2600') {
                return 'slateblue'
            } else if (category === 'PC') {
                return 'darkslateblue'
            }
        })
        .style('stroke', 'wheat')
        .attr('data-name', (d) => {return d.data.name})
        .attr('data-category', (d) => {return d.data.category})
        .attr('data-value', (d) => {return d.data.value})
        .attr('width', (d) => {return d.x1 - d.x0})
        .attr('height', (d) => {return d.y1 - d.y0})
        .on('mouseover', (d, i) => {
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(
              "Name: " +
                d.toElement.__data__.data.name +
                "<br>" +
                "Category: " +
                d.toElement.__data__.data.category +
                "<br>" +
                "Value: " +
                d.toElement.__data__.data.value
            )
            .attr("data-value", d.toElement.__data__.data.value);
        

        }) 
        .on('mouseout', (d, i) => {
            tooltip.transition()
                .duration(200)
                .style('opacity', 0)
        })

    block.append('text')
        .text((d) => {return d.data.name})
        .style('font-size', '10px')
        .style('text-anchor', 'start')
        .style('text-align', 'left')
        .attr('x', 5)
        .attr('y', 25)


}

let drawLegend = () => {
    
    }

d3.json(url).then((data, error) => {
    if (error) {
        console.log(error)
    } else {
        gameData = data
        console.log(gameData)
        drawMap()
        drawLegend()
    }
})