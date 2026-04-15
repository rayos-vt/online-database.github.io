const SELECT = 'SELECT * FROM imagedata';
const mainBody = document.getElementById('content');
const op = '[<>=!]=?'
const regexp = '\w+' + op + '[\w\*\.\-\(\)/]+[web(p|m)]?';
const repexp = '(\w+' + op + ')([\.\w/]+)';
var rows = '';
var data = [];
var current = [];

function update_query(join = '', where=' WHERE ', having = '', limit=1000) {
    
    string = document.getElementById('query').value;
    query = {};

    // query parsing
    string.matchAll(regexp).forEach((token) => {
        
        string = string.replace(token, '')
        col, val = re.split(op, token)
        
        if (col == 'comic') {
            
            token = "comic.parent='" +  val + "'";
            join = 'JOIN comic ON comic.path=imagedata.path';
        }
        else if (col == 'order') {

            order = 'ORDER BY ' + val;
            return;
        }
        else if (col == 'limit') {
            
            limit = val;
            return;
        }
        else if (col in ('date', 'date_used')) {
            
            operator = token.replace(col, '').replace(val, '');
            token = 'date_used' + operator + '"' + val + '"';
        }
        else if (val.match('\*')) {
            
            token = col + ' LIKE "' + val.replace("*", "%") + '"';
        }
        else if (val == 'NULL') {
            
            neg = ('!' in token) ? 'NOT ' : '';
            token = neg + 'IS ' + val + '(' + col + ')';
        }
        else if (re.search('\D', val)) {

            token = token.replace(repexp, '\x01"\x02"');
        }
        query[col] = query.get(col, []) + [token];
    });
    // tag parsing
    if (string.strip()) {
        
        query['tags'] = [
            'MATCH(tags, artist) AGAINST("' + self.tag_parser(string) + '" IN BOOLEAN MODE)'
            ];
    }; 
    if (query) {
        query.values().forEach((val) => {
            where += ' AND ' + val ? '(' + " OR ".join(val) + ')' : '';
        });
    };
    query = SELECT + join + where + having + order + ' LIMIT ' + limit;

    data = [
        [427429, '1565aa8fd3a6ef6b51c9dcc1c89e9931.webp', ' shimao_kazu ', ' comic censored qwd sex greyscale large_breasts 1boy boots nipples breasts blush monochrome 1girl frills ', 'Explicit', 4, 'Comic', 'nhentai', '2021-08-12', '32c6462423154833', '/g/188625/', 'https://i.nhentai.net/galleries/1032513/13.jpg'],
        [8143, '260ad8c7d3573c048950c2d92b257a49.webp', ' feguimel ', ' tabard rose standing flower artist_name mouth_hold signature bottomless red_hair bandage red_ribbon solo qwd bun_cover red_flower 1girl parted_lips blue_background shirt hands_up white_shirt nose red_eyes ribbon bandaged_arm open_shirt nipples looking_at_viewer simple_background red_rose bangs lips smile purple_background cuffs medium_breasts slender breasts open_clothes gradient_background double_bun gradient ', 'Questionable', 4, 'Illustration', 'gelbooru', '2019-01-01', 'cd968666e6ec4d22', 'index.php?page=post&s=view&id=4172754', 'https://img2.gelbooru.com//images/26/0a/260ad8c7d3573c048950c2d92b257a49.jpg'],
        [437715, '458d5787abb567532db277b177e86dfb.webp', ' mobu ', ' revealing_clothes animal_ears censored qwd arm_strap heart open_mouth breasts penis_on_face monochrome 1girl metal_collar collar simple_background sidelocks medium_hair fur_trim headpat penis greyscale bare_shoulders 1boy wolf_ears paizuri aphorisms blush white_background sex bangs erection large_breasts penis_over_one_eye wolf_girl ', 'Explicit', 4, 'Illustration', 'gelbooru', '2021-08-16', '909c2c2c8e8c330f', 'index.php?page=post&s=view&id=5391606', 'https://img3.gelbooru.com/images/45/8d/458d5787abb567532db277b177e86dfb.png'],
        [61321, '4f582b139ed770061112a3799849ac51.webp', ' dross ', " boots looking_at_viewer full_moon 1boy brooch nude male_focus red_eyes emotionless artist_name solo qwd penis forehead_jewel moon cape genderswap nipples slender halloween legs trap purple_hair pumpkin purple_footwear testicles night bob_cut jack_o'_lantern blush sitting short_hair jewelry ", 'Explicit', 4, 'Illustration', 'gelbooru', '2019-01-01', '666665e7f6ea8bc9', 'index.php?page=post&s=view&id=4980410', 'https://img2.gelbooru.com/images/4f/58/4f582b139ed770061112a3799849ac51.jpeg'],
        [41390, '91d1f4a6d387c7503356f2beb1dc6790.webp', ' moneti_(daifuku) ', ' cleavage_cutout blush flower indoors purple_eyes hair_ornament shirt_lift bottomless wince bare_shoulders solo pubic_hair qwd bow nose_blush sleeveless_shirt hair_ribbon straddling window girl_on_top curtains light_brown_hair hair_flower arm_support 1girl breasts mosaic_censor censored shirt blonde_hair cum_in_vulva twin_braids spread_legs vulva ribbon 1boy penis hairband aphorisms breast_press cum official_art nipples looking_at_viewer game_cg large_breasts cowgirl_position revealing_clothes long_hair assertive bangs smile black_bow hair_over_shoulder sleeveless censored blood barefoot clothes_lift sex from_below bed sweat pov one_eye_closed canopy_bed hair_bow braid ', 'Explicit', 4, 'Illustration', 'gelbooru', '2019-01-01', '31313020a8f0c8cc', 'index.php?page=post&s=view&id=3187394', 'https://img2.gelbooru.com//images/91/d1/91d1f4a6d387c7503356f2beb1dc6790.png'],
        [110089, '9610dfacd5ba5120d59107e0cb770be8.webp', ' oryo_(oryo04) ', ' thighhighs qwd solo open_mouth breasts lotion 1girl skindentation nippleless_clothes long_hair breast_squeeze black_bra lingerie nipples black_panties spread_legs smile brown_eyes panties lying garter_belt looking_at_viewer underwear eyebrows_visible_through_hair blush lotion_bottle sexy groin black_legwear bangs large_breasts on_back navel brown_hair bra ', 'Questionable', 4, 'Illustration', 'gelbooru', '2000-01-01', '875b49c359dd49c1', 'index.php?page=post&s=view&id=5147801', 'https://img4.gelbooru.com/images/96/10/9610dfacd5ba5120d59107e0cb770be8.jpg'],
        [643167, 'a640ac5daa39f0f0a30a8a4cfb29db8b.webp', ' sunna_(nilsunna) ', ' shadow qwd presenting_hindquarters solo choker beach_towel shell dark_skinned_female breasts beach vulva 1girl worktool beachball elf top_down_bottom_up shovel bare_ass looking_back ball sidelocks short_hair female_only towel nipples pointed_ears dark_skin seashell sand brown_eyes sand_castle ass sand_sculpture shade looking_at_viewer sideboob outdoor_nudity blush blonde_hair outdoors backboob presenting wet anus ', 'Explicit', 4, 'Illustration', 'sankaku', '2022-01-14', '33f09673c09927e1', '/posts/XEa1q1J10aq', 'https://v.sankakucomplex.com/data/a6/40/a640ac5daa39f0f0a30a8a4cfb29db8b.png?e=1642179017&m=ORV8k94-yuNZg0CTx1w1mg&expires=1642179017&token=prW_HGwg9onti2JZbFTjSU7ytCZY9JdX7x11ZStkmhk'],
        [822412, 'b4cecc1619b2077675318a6b3c2b98a1.webp', ' distr ', ' animal_ears qwd solo closed_mouth pink_eyes piercing breasts vulva earrings 1girl completely_nude jewelry simple_background long_hair red_nails nipples smile long_sleeves fingernails looking_at_viewer nail_polish pink_hair detached_sleeves white_background large_breasts nude navel presenting ', 'Explicit', 4, 'Illustration', 'gelbooru', '2022-11-25', '0c0d2c2e7235b7cb', 'index.php?page=post&s=view&id=7702307', 'https://img3.gelbooru.com/images/b4/ce/b4cecc1619b2077675318a6b3c2b98a1.jpg'],
        [396389, 'cf5cd8dad7e824fe162becaf71adfa61.webp', ' shiokonbu laminaria_(shiokonbu) ', ' censored qwd bar_censor solo open_mouth breasts vulva monochrome 1girl sweater female_orgasm long_hair nipples spread_legs penis lying greyscale 1boy blush pubic_hair sex large_breasts orgasm navel ', 'Explicit', 4, 'Comic', 'nhentai', '2021-08-03', '1f4f6b313d23339e', '/g/220645/', 'https://i.nhentai.net/galleries/1169584/20.jpg'],
        [470285, 'f888d60a4cdb15cd062f585d3d8fcc9c.webp', ' zeroshiki_kouichi ', ' thighhighs censored tongue_out qwd solo ponytail heart mosaic_censor hair_between_eyes open_mouth breasts tongue 1girl comic black_hair purple_hair long_hair shorts nipples testicles penis ass 1boy blush sex large_breasts nude ', 'Explicit', 4, 'Comic', 'nhentai', '2021-09-03', 'e1c7a2e54ca7c636', '/g/265767/', 'https://i.nhentai.net/galleries/1379600/23.jpg']
    ];
    update_gallery(data);
}
function update_gallery(data) {
    
    mainBody.innerHTML = ''

    data.forEach((row) => {
        
        thumbnail = '<img class="thumbnail" src=/images/' + row[1] + '>'
        filename = '<div class="filename">' + row[1] + '</div>'
        details = (
            '<select class="details">' +
                '<option>Information</option>' +
                '<option>Delete</option>' +
            '</select>'
        )
        
        rows += (
            '<button class="row" onclick="select_row(this, event)">' +
            thumbnail + filename + details + '</button>'
            );
        });
        
        // rows += (
        //     '<div class="row"><button class="row-content" onclick="select_row(this, event)">' +
        //     thumbnail + filename + '</button>' + details + '</div>'
        //     );
        // });

    mainBody.innerHTML = rows;
}
function update_row() {

}
function select_row(row, event) {

    console.log('row')
    mainBody.innerHTML = ''
    current = row;

    src = row.children[0].attributes.src.value;
    image = '<img id="slideshow" src=' + src + '>';

    pageContent = image;

    mainBody.innerHTML = pageContent;
}
function return_to_gallery() {
    mainBody.innerHTML = rows;
}