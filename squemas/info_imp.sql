SELECT u.id_usu, u.nom_usu, r.nom_rol, c.nic_cue, c.cor_cue, u.tel_usu
FROM norvus_bd.usuario u
JOIN norvus_bd.rol r ON u.id_rol = r.id_rol
JOIN norvus_bd.cuenta c ON u.id_usu = c.id_usu
WHERE u.id_usu = 1;