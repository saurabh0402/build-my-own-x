## Functions

<dl>
<dt><a href="#chunk">chunk(array, size)</a> ⇒</dt>
<dd><p>Creates a new array with the original array being split into chunks of <code>size</code>.
The final element can has a smaller size depending on if the <code>array</code> can be splitted evenly.</p>
</dd>
<dt><a href="#concat">concat(array, ...values)</a> ⇒</dt>
<dd><p>Creates a new array with all the value from second argument onwards concatenated to the first argument.
If there&#39;s a &quot;More than 1&quot;-D array, it is flattened to 1 level and all values are concatenated.</p>
</dd>
</dl>

<a name="chunk"></a>

## chunk(array, size) ⇒
Creates a new array with the original array being split into chunks of `size`.
The final element can has a smaller size depending on if the `array` can be splitted evenly.

**Kind**: global function  
**Returns**: Array  

| Param | Type | Default |
| --- | --- | --- |
| array | <code>Array</code> |  | 
| size | <code>number</code> | <code>1</code> | 

<a name="concat"></a>

## concat(array, ...values) ⇒
Creates a new array with all the value from second argument onwards concatenated to the first argument.
If there's a "More than 1"-D array, it is flattened to 1 level and all values are concatenated.

**Kind**: global function  
**Returns**: array  

| Param | Type |
| --- | --- |
| array | <code>\*</code> | 
| ...values | <code>any</code> | 

